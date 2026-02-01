
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PromotionsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const promotions = await db.promotions.create(
            {
                id: data.id || undefined,
        
        title: data.title
        ||
        null
            ,
            
        description: data.description
        ||
        null
            ,
            
        start: data.start
        ||
        null
            ,
            
        end: data.end
        ||
        null
            ,
            
        active: data.active
        ||
        false
        
            ,
            
        discount: data.discount
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.promotions.getTableName(),
                belongsToColumn: 'banner',
                belongsToId: promotions.id,
            },
            data.banner,
            options,
        );
        

        return promotions;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const promotionsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                title: item.title
            ||
            null
            ,
            
                description: item.description
            ||
            null
            ,
            
                start: item.start
            ||
            null
            ,
            
                end: item.end
            ||
            null
            ,
            
                active: item.active
            ||
            false
        
            ,
            
                discount: item.discount
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const promotions = await db.promotions.bulkCreate(promotionsData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < promotions.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.promotions.getTableName(),
                    belongsToColumn: 'banner',
                    belongsToId: promotions[i].id,
                },
                data[i].banner,
                options,
            );
        }
        

        return promotions;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const promotions = await db.promotions.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.title !== undefined) updatePayload.title = data.title;
        
        
        if (data.description !== undefined) updatePayload.description = data.description;
        
        
        if (data.start !== undefined) updatePayload.start = data.start;
        
        
        if (data.end !== undefined) updatePayload.end = data.end;
        
        
        if (data.active !== undefined) updatePayload.active = data.active;
        
        
        if (data.discount !== undefined) updatePayload.discount = data.discount;
        
        
        updatePayload.updatedById = currentUser.id;

        await promotions.update(updatePayload, {transaction});

        
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.promotions.getTableName(),
                belongsToColumn: 'banner',
                belongsToId: promotions.id,
            },
            data.banner,
            options,
        );
        

        return promotions;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const promotions = await db.promotions.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of promotions) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of promotions) {
                await record.destroy({transaction});
            }
        });


        return promotions;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const promotions = await db.promotions.findByPk(id, options);

        await promotions.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await promotions.destroy({
            transaction
        });

        return promotions;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const promotions = await db.promotions.findOne(
            { where },
            { transaction },
        );

        if (!promotions) {
            return promotions;
        }

        const output = promotions.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.banner = await promotions.getBanner({
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
        model: db.file,
        as: 'banner',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.title) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'promotions',
                        'title',
                        filter.title,
                    ),
                };
            }
            
            if (filter.description) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'promotions',
                        'description',
                        filter.description,
                    ),
                };
            }
            

            
            
            if (filter.calendarStart && filter.calendarEnd) {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            start: {
                                [Op.between]: [filter.calendarStart, filter.calendarEnd],
                            },
                    },
                {
                    end: {
                        [Op.between]: [filter.calendarStart, filter.calendarEnd],
                    },
                },
                ],
            };
            }
            

            
            if (filter.startRange) {
                const [start, end] = filter.startRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    start: {
                    ...where.start,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    start: {
                    ...where.start,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.endRange) {
                const [start, end] = filter.endRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    end: {
                    ...where.end,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    end: {
                    ...where.end,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.discountRange) {
                const [start, end] = filter.discountRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    discount: {
                    ...where.discount,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    discount: {
                    ...where.discount,
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

            
            if (filter.active) {
                where = {
                    ...where,
                active: filter.active,
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
            const { rows, count } = await db.promotions.findAndCountAll(queryOptions);

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
                        'promotions',
                        'title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.promotions.findAll({
            attributes: [ 'id', 'title' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['title', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.title,
        }));
    }

    
};

