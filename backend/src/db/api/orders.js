
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OrdersDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const orders = await db.orders.create(
            {
                id: data.id || undefined,
        
        reference: data.reference
        ||
        null
            ,
            
        total: data.total
        ||
        null
            ,
            
        status: data.status
        ||
        null
            ,
            
        pickup_time: data.pickup_time
        ||
        null
            ,
            
        paid: data.paid
        ||
        false
        
            ,
            
        stripe_charge: data.stripe_charge
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await orders.setCustomer( data.customer || null, {
            transaction,
        });
        

        
        await orders.setItems(data.items || [], {
            transaction,
        });
        

        

        return orders;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const ordersData = data.map((item, index) => ({
                id: item.id || undefined,
                
                reference: item.reference
            ||
            null
            ,
            
                total: item.total
            ||
            null
            ,
            
                status: item.status
            ||
            null
            ,
            
                pickup_time: item.pickup_time
            ||
            null
            ,
            
                paid: item.paid
            ||
            false
        
            ,
            
                stripe_charge: item.stripe_charge
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const orders = await db.orders.bulkCreate(ordersData, { transaction });

        // For each item created, replace relation files
        

        return orders;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const orders = await db.orders.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.reference !== undefined) updatePayload.reference = data.reference;
        
        
        if (data.total !== undefined) updatePayload.total = data.total;
        
        
        if (data.status !== undefined) updatePayload.status = data.status;
        
        
        if (data.pickup_time !== undefined) updatePayload.pickup_time = data.pickup_time;
        
        
        if (data.paid !== undefined) updatePayload.paid = data.paid;
        
        
        if (data.stripe_charge !== undefined) updatePayload.stripe_charge = data.stripe_charge;
        
        
        updatePayload.updatedById = currentUser.id;

        await orders.update(updatePayload, {transaction});

        
        
        if (data.customer !== undefined) {
            await orders.setCustomer(
              
              data.customer,
              
              { transaction }
            );
        }
        

        
        
        if (data.items !== undefined) {
            await orders.setItems(data.items, { transaction });
        }
        

        

        return orders;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const orders = await db.orders.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of orders) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of orders) {
                await record.destroy({transaction});
            }
        });


        return orders;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const orders = await db.orders.findByPk(id, options);

        await orders.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await orders.destroy({
            transaction
        });

        return orders;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const orders = await db.orders.findOne(
            { where },
            { transaction },
        );

        if (!orders) {
            return orders;
        }

        const output = orders.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.customer = await orders.getCustomer({
            transaction
        });
        
        
        output.items = await orders.getItems({
            transaction
        });
        
        

        return output;
    }

    static async findAll(
          filter,
           options
        ) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        

        

        offset = currentPage * limit;

        const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [

      {
        model: db.users,
        as: 'customer',
        
        where: filter.customer ? {
          [Op.or]: [
            { id: { [Op.in]: filter.customer.split('|').map(term => Utils.uuid(term)) } },
            {
              firstName: {
                [Op.or]: filter.customer.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },


      {
        model: db.menu_items,
        as: 'items',
        required: false,
      },


    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.reference) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'orders',
                        'reference',
                        filter.reference,
                    ),
                };
            }
            
            if (filter.stripe_charge) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'orders',
                        'stripe_charge',
                        filter.stripe_charge,
                    ),
                };
            }
            

            
            

            
            if (filter.totalRange) {
                const [start, end] = filter.totalRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    total: {
                    ...where.total,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    total: {
                    ...where.total,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.pickup_timeRange) {
                const [start, end] = filter.pickup_timeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    pickup_time: {
                    ...where.pickup_time,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    pickup_time: {
                    ...where.pickup_time,
                            [Op.lte]: end,
                    },
                };
                }
            }
            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            
            if (filter.status) {
                where = {
                    ...where,
                status: filter.status,
            };
            }
            
            if (filter.paid) {
                where = {
                    ...where,
                paid: filter.paid,
            };
            }
            


      


      if (filter.items) {
        const searchTerms = filter.items.split('|');

        include = [
          {
            model: db.menu_items,
            as: 'items_filter',
            required: searchTerms.length > 0,
            where: searchTerms.length > 0 ? {
              [Op.or]: [
                { id: { [Op.in]: searchTerms.map(term => Utils.uuid(term)) } },
                { 
                  title: {
                    [Op.or]: searchTerms.map(term => ({ [Op.iLike]: `%${term}%` }))
                  }
                }
              ]
            } : undefined
          },
          ...include,
        ]
      }


            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }
        

        

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.orders.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset, ) {
        let where = {};
        
        

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'orders',
                        'reference',
                        query,
                    ),
                ],
            };
        }

        const records = await db.orders.findAll({
            attributes: [ 'id', 'reference' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['reference', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.reference,
        }));
    }

    
};

