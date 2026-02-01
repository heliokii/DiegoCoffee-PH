
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Menu_itemsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const menu_items = await db.menu_items.create(
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
            
        price: data.price
        ||
        null
            ,
            
        item_type: data.item_type
        ||
        null
            ,
            
        ingredients: data.ingredients
        ||
        null
            ,
            
        is_featured: data.is_featured
        ||
        false
        
            ,
            
        is_available: data.is_available
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await menu_items.setCategory( data.category || null, {
            transaction,
        });
        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.menu_items.getTableName(),
                belongsToColumn: 'photos',
                belongsToId: menu_items.id,
            },
            data.photos,
            options,
        );
        

        return menu_items;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const menu_itemsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                title: item.title
            ||
            null
            ,
            
                description: item.description
            ||
            null
            ,
            
                price: item.price
            ||
            null
            ,
            
                item_type: item.item_type
            ||
            null
            ,
            
                ingredients: item.ingredients
            ||
            null
            ,
            
                is_featured: item.is_featured
            ||
            false
        
            ,
            
                is_available: item.is_available
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const menu_items = await db.menu_items.bulkCreate(menu_itemsData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < menu_items.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.menu_items.getTableName(),
                    belongsToColumn: 'photos',
                    belongsToId: menu_items[i].id,
                },
                data[i].photos,
                options,
            );
        }
        

        return menu_items;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const menu_items = await db.menu_items.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.title !== undefined) updatePayload.title = data.title;
        
        
        if (data.description !== undefined) updatePayload.description = data.description;
        
        
        if (data.price !== undefined) updatePayload.price = data.price;
        
        
        if (data.item_type !== undefined) updatePayload.item_type = data.item_type;
        
        
        if (data.ingredients !== undefined) updatePayload.ingredients = data.ingredients;
        
        
        if (data.is_featured !== undefined) updatePayload.is_featured = data.is_featured;
        
        
        if (data.is_available !== undefined) updatePayload.is_available = data.is_available;
        
        
        updatePayload.updatedById = currentUser.id;

        await menu_items.update(updatePayload, {transaction});

        
        
        if (data.category !== undefined) {
            await menu_items.setCategory(
              
              data.category,
              
              { transaction }
            );
        }
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.menu_items.getTableName(),
                belongsToColumn: 'photos',
                belongsToId: menu_items.id,
            },
            data.photos,
            options,
        );
        

        return menu_items;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const menu_items = await db.menu_items.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of menu_items) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of menu_items) {
                await record.destroy({transaction});
            }
        });


        return menu_items;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const menu_items = await db.menu_items.findByPk(id, options);

        await menu_items.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await menu_items.destroy({
            transaction
        });

        return menu_items;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const menu_items = await db.menu_items.findOne(
            { where },
            { transaction },
        );

        if (!menu_items) {
            return menu_items;
        }

        const output = menu_items.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.category = await menu_items.getCategory({
            transaction
        });
        
        
        output.photos = await menu_items.getPhotos({
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
        model: db.categories,
        as: 'category',
        
        where: filter.category ? {
          [Op.or]: [
            { id: { [Op.in]: filter.category.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.category.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },



      {
        model: db.file,
        as: 'photos',
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
                        'menu_items',
                        'title',
                        filter.title,
                    ),
                };
            }
            
            if (filter.description) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'menu_items',
                        'description',
                        filter.description,
                    ),
                };
            }
            
            if (filter.ingredients) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'menu_items',
                        'ingredients',
                        filter.ingredients,
                    ),
                };
            }
            

            
            

            
            if (filter.priceRange) {
                const [start, end] = filter.priceRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    price: {
                    ...where.price,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    price: {
                    ...where.price,
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

            
            if (filter.item_type) {
                where = {
                    ...where,
                item_type: filter.item_type,
            };
            }
            
            if (filter.is_featured) {
                where = {
                    ...where,
                is_featured: filter.is_featured,
            };
            }
            
            if (filter.is_available) {
                where = {
                    ...where,
                is_available: filter.is_available,
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
            const { rows, count } = await db.menu_items.findAndCountAll(queryOptions);

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
                        'menu_items',
                        'title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.menu_items.findAll({
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

