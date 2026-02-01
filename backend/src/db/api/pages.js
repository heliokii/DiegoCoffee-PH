
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PagesDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const pages = await db.pages.create(
            {
                id: data.id || undefined,
        
        slug: data.slug
        ||
        null
            ,
            
        title: data.title
        ||
        null
            ,
            
        content: data.content
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        

        

        

        return pages;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const pagesData = data.map((item, index) => ({
                id: item.id || undefined,
                
                slug: item.slug
            ||
            null
            ,
            
                title: item.title
            ||
            null
            ,
            
                content: item.content
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const pages = await db.pages.bulkCreate(pagesData, { transaction });

        // For each item created, replace relation files
        

        return pages;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const pages = await db.pages.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.slug !== undefined) updatePayload.slug = data.slug;
        
        
        if (data.title !== undefined) updatePayload.title = data.title;
        
        
        if (data.content !== undefined) updatePayload.content = data.content;
        
        
        updatePayload.updatedById = currentUser.id;

        await pages.update(updatePayload, {transaction});

        
        

        
        

        

        return pages;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const pages = await db.pages.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of pages) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of pages) {
                await record.destroy({transaction});
            }
        });


        return pages;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const pages = await db.pages.findByPk(id, options);

        await pages.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await pages.destroy({
            transaction
        });

        return pages;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const pages = await db.pages.findOne(
            { where },
            { transaction },
        );

        if (!pages) {
            return pages;
        }

        const output = pages.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        

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



    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.slug) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pages',
                        'slug',
                        filter.slug,
                    ),
                };
            }
            
            if (filter.title) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pages',
                        'title',
                        filter.title,
                    ),
                };
            }
            
            if (filter.content) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pages',
                        'content',
                        filter.content,
                    ),
                };
            }
            

            
            

            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
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
            const { rows, count } = await db.pages.findAndCountAll(queryOptions);

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
                        'pages',
                        'title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.pages.findAll({
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

