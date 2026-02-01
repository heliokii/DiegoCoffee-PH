
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LocationsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const locations = await db.locations.create(
            {
                id: data.id || undefined,
        
        name: data.name
        ||
        null
            ,
            
        address: data.address
        ||
        null
            ,
            
        latitude: data.latitude
        ||
        null
            ,
            
        longitude: data.longitude
        ||
        null
            ,
            
        hours: data.hours
        ||
        null
            ,
            
        phone: data.phone
        ||
        null
            ,
            
        city: data.city
        ||
        null
            ,
            
        is_open: data.is_open
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        

        

        

        return locations;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const locationsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                name: item.name
            ||
            null
            ,
            
                address: item.address
            ||
            null
            ,
            
                latitude: item.latitude
            ||
            null
            ,
            
                longitude: item.longitude
            ||
            null
            ,
            
                hours: item.hours
            ||
            null
            ,
            
                phone: item.phone
            ||
            null
            ,
            
                city: item.city
            ||
            null
            ,
            
                is_open: item.is_open
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const locations = await db.locations.bulkCreate(locationsData, { transaction });

        // For each item created, replace relation files
        

        return locations;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const locations = await db.locations.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.address !== undefined) updatePayload.address = data.address;
        
        
        if (data.latitude !== undefined) updatePayload.latitude = data.latitude;
        
        
        if (data.longitude !== undefined) updatePayload.longitude = data.longitude;
        
        
        if (data.hours !== undefined) updatePayload.hours = data.hours;
        
        
        if (data.phone !== undefined) updatePayload.phone = data.phone;
        
        
        if (data.city !== undefined) updatePayload.city = data.city;
        
        
        if (data.is_open !== undefined) updatePayload.is_open = data.is_open;
        
        
        updatePayload.updatedById = currentUser.id;

        await locations.update(updatePayload, {transaction});

        
        

        
        

        

        return locations;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const locations = await db.locations.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of locations) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of locations) {
                await record.destroy({transaction});
            }
        });


        return locations;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const locations = await db.locations.findByPk(id, options);

        await locations.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await locations.destroy({
            transaction
        });

        return locations;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const locations = await db.locations.findOne(
            { where },
            { transaction },
        );

        if (!locations) {
            return locations;
        }

        const output = locations.get({plain: true});

        
        
        
        
        
        
        
        output.reservations_location = await locations.getReservations_location({
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
                        'locations',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.address) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'locations',
                        'address',
                        filter.address,
                    ),
                };
            }
            
            if (filter.hours) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'locations',
                        'hours',
                        filter.hours,
                    ),
                };
            }
            
            if (filter.phone) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'locations',
                        'phone',
                        filter.phone,
                    ),
                };
            }
            

            
            

            
            if (filter.latitudeRange) {
                const [start, end] = filter.latitudeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    latitude: {
                    ...where.latitude,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    latitude: {
                    ...where.latitude,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.longitudeRange) {
                const [start, end] = filter.longitudeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    longitude: {
                    ...where.longitude,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    longitude: {
                    ...where.longitude,
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

            
            if (filter.city) {
                where = {
                    ...where,
                city: filter.city,
            };
            }
            
            if (filter.is_open) {
                where = {
                    ...where,
                is_open: filter.is_open,
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
            const { rows, count } = await db.locations.findAndCountAll(queryOptions);

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
                        'locations',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.locations.findAll({
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

