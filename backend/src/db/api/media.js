
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class MediaDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const media = await db.media.create(
            {
                id: data.id || undefined,
        
        alt_text: data.alt_text
        ||
        null
            ,
            
        caption: data.caption
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
                belongsTo: db.media.getTableName(),
                belongsToColumn: 'file',
                belongsToId: media.id,
            },
            data.file,
            options,
        );
        

        return media;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const mediaData = data.map((item, index) => ({
                id: item.id || undefined,
                
                alt_text: item.alt_text
            ||
            null
            ,
            
                caption: item.caption
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const media = await db.media.bulkCreate(mediaData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < media.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.media.getTableName(),
                    belongsToColumn: 'file',
                    belongsToId: media[i].id,
                },
                data[i].file,
                options,
            );
        }
        

        return media;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const media = await db.media.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.alt_text !== undefined) updatePayload.alt_text = data.alt_text;
        
        
        if (data.caption !== undefined) updatePayload.caption = data.caption;
        
        
        updatePayload.updatedById = currentUser.id;

        await media.update(updatePayload, {transaction});

        
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.media.getTableName(),
                belongsToColumn: 'file',
                belongsToId: media.id,
            },
            data.file,
            options,
        );
        

        return media;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const media = await db.media.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of media) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of media) {
                await record.destroy({transaction});
            }
        });


        return media;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const media = await db.media.findByPk(id, options);

        await media.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await media.destroy({
            transaction
        });

        return media;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const media = await db.media.findOne(
            { where },
            { transaction },
        );

        if (!media) {
            return media;
        }

        const output = media.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.file = await media.getFile({
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
        as: 'file',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.alt_text) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'media',
                        'alt_text',
                        filter.alt_text,
                    ),
                };
            }
            
            if (filter.caption) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'media',
                        'caption',
                        filter.caption,
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
            const { rows, count } = await db.media.findAndCountAll(queryOptions);

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
                        'media',
                        'caption',
                        query,
                    ),
                ],
            };
        }

        const records = await db.media.findAll({
            attributes: [ 'id', 'caption' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['caption', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.caption,
        }));
    }

    
};

