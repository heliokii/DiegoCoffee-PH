
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReservationsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const reservations = await db.reservations.create(
            {
                id: data.id || undefined,
        
        name: data.name
        ||
        null
            ,
            
        email: data.email
        ||
        null
            ,
            
        phone: data.phone
        ||
        null
            ,
            
        message: data.message
        ||
        null
            ,
            
        reservation_start: data.reservation_start
        ||
        null
            ,
            
        reservation_end: data.reservation_end
        ||
        null
            ,
            
        party_size: data.party_size
        ||
        null
            ,
            
        status: data.status
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await reservations.setLocation( data.location || null, {
            transaction,
        });
        

        

        

        return reservations;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const reservationsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                name: item.name
            ||
            null
            ,
            
                email: item.email
            ||
            null
            ,
            
                phone: item.phone
            ||
            null
            ,
            
                message: item.message
            ||
            null
            ,
            
                reservation_start: item.reservation_start
            ||
            null
            ,
            
                reservation_end: item.reservation_end
            ||
            null
            ,
            
                party_size: item.party_size
            ||
            null
            ,
            
                status: item.status
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const reservations = await db.reservations.bulkCreate(reservationsData, { transaction });

        // For each item created, replace relation files
        

        return reservations;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const reservations = await db.reservations.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.email !== undefined) updatePayload.email = data.email;
        
        
        if (data.phone !== undefined) updatePayload.phone = data.phone;
        
        
        if (data.message !== undefined) updatePayload.message = data.message;
        
        
        if (data.reservation_start !== undefined) updatePayload.reservation_start = data.reservation_start;
        
        
        if (data.reservation_end !== undefined) updatePayload.reservation_end = data.reservation_end;
        
        
        if (data.party_size !== undefined) updatePayload.party_size = data.party_size;
        
        
        if (data.status !== undefined) updatePayload.status = data.status;
        
        
        updatePayload.updatedById = currentUser.id;

        await reservations.update(updatePayload, {transaction});

        
        
        if (data.location !== undefined) {
            await reservations.setLocation(
              
              data.location,
              
              { transaction }
            );
        }
        

        
        

        

        return reservations;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const reservations = await db.reservations.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of reservations) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of reservations) {
                await record.destroy({transaction});
            }
        });


        return reservations;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const reservations = await db.reservations.findByPk(id, options);

        await reservations.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await reservations.destroy({
            transaction
        });

        return reservations;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const reservations = await db.reservations.findOne(
            { where },
            { transaction },
        );

        if (!reservations) {
            return reservations;
        }

        const output = reservations.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.location = await reservations.getLocation({
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
        model: db.locations,
        as: 'location',
        
        where: filter.location ? {
          [Op.or]: [
            { id: { [Op.in]: filter.location.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.location.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },



    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.name) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'reservations',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.email) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'reservations',
                        'email',
                        filter.email,
                    ),
                };
            }
            
            if (filter.phone) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'reservations',
                        'phone',
                        filter.phone,
                    ),
                };
            }
            
            if (filter.message) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'reservations',
                        'message',
                        filter.message,
                    ),
                };
            }
            

            
            
            if (filter.calendarStart && filter.calendarEnd) {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            reservation_start: {
                                [Op.between]: [filter.calendarStart, filter.calendarEnd],
                            },
                    },
                {
                    reservation_end: {
                        [Op.between]: [filter.calendarStart, filter.calendarEnd],
                    },
                },
                ],
            };
            }
            

            
            if (filter.reservation_startRange) {
                const [start, end] = filter.reservation_startRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    reservation_start: {
                    ...where.reservation_start,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    reservation_start: {
                    ...where.reservation_start,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.reservation_endRange) {
                const [start, end] = filter.reservation_endRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    reservation_end: {
                    ...where.reservation_end,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    reservation_end: {
                    ...where.reservation_end,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.party_sizeRange) {
                const [start, end] = filter.party_sizeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    party_size: {
                    ...where.party_size,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    party_size: {
                    ...where.party_size,
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
            const { rows, count } = await db.reservations.findAndCountAll(queryOptions);

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
                        'reservations',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.reservations.findAll({
            attributes: [ 'id', 'name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.name,
        }));
    }

    
};

