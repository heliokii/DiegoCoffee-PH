
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PitchesDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const pitches = await db.pitches.create(
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
            
        pitch_type: data.pitch_type
        ||
        null
            ,
            
        message: data.message
        ||
        null
            ,
            
        submitted_at: data.submitted_at
        ||
        null
            ,
            
        notified: data.notified
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        

        

        

        return pitches;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const pitchesData = data.map((item, index) => ({
                id: item.id || undefined,
                
                name: item.name
            ||
            null
            ,
            
                email: item.email
            ||
            null
            ,
            
                pitch_type: item.pitch_type
            ||
            null
            ,
            
                message: item.message
            ||
            null
            ,
            
                submitted_at: item.submitted_at
            ||
            null
            ,
            
                notified: item.notified
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const pitches = await db.pitches.bulkCreate(pitchesData, { transaction });

        // For each item created, replace relation files
        

        return pitches;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const pitches = await db.pitches.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.email !== undefined) updatePayload.email = data.email;
        
        
        if (data.pitch_type !== undefined) updatePayload.pitch_type = data.pitch_type;
        
        
        if (data.message !== undefined) updatePayload.message = data.message;
        
        
        if (data.submitted_at !== undefined) updatePayload.submitted_at = data.submitted_at;
        
        
        if (data.notified !== undefined) updatePayload.notified = data.notified;
        
        
        updatePayload.updatedById = currentUser.id;

        await pitches.update(updatePayload, {transaction});

        
        

        
        

        

        return pitches;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const pitches = await db.pitches.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of pitches) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of pitches) {
                await record.destroy({transaction});
            }
        });


        return pitches;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const pitches = await db.pitches.findByPk(id, options);

        await pitches.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await pitches.destroy({
            transaction
        });

        return pitches;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const pitches = await db.pitches.findOne(
            { where },
            { transaction },
        );

        if (!pitches) {
            return pitches;
        }

        const output = pitches.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        

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

            
            if (filter.name) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pitches',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.email) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pitches',
                        'email',
                        filter.email,
                    ),
                };
            }
            
            if (filter.message) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pitches',
                        'message',
                        filter.message,
                    ),
                };
            }
            

            
            

            
            if (filter.submitted_atRange) {
                const [start, end] = filter.submitted_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    submitted_at: {
                    ...where.submitted_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    submitted_at: {
                    ...where.submitted_at,
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

            
            if (filter.pitch_type) {
                where = {
                    ...where,
                pitch_type: filter.pitch_type,
            };
            }
            
            if (filter.notified) {
                where = {
                    ...where,
                notified: filter.notified,
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
            const { rows, count } = await db.pitches.findAndCountAll(queryOptions);

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
                        'pitches',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.pitches.findAll({
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

