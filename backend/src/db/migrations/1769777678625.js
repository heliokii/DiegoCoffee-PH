module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            
                
                    await queryInterface.createTable('users', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('roles', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('permissions', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('menu_items', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('categories', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('promotions', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('reservations', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('pitches', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('locations', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('orders', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('media', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('pages', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'firstName',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'phoneNumber',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'disabled',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationToken',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'passwordResetToken',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'passwordResetTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'app_roleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'roles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'roles',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'roles',
                      'role_customization',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'permissions',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'title',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'price',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'categoryId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'categories',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'item_type',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['Coffee','Cocktail','Food','Frappes','Ice','Hot'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'ingredients',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'is_featured',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'menu_items',
                      'is_available',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'categories',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'categories',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'promotions',
                      'title',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'promotions',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'promotions',
                      'start',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'promotions',
                      'end',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'promotions',
                      'active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'promotions',
                      'discount',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'phone',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'message',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'reservation_start',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'reservation_end',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'party_size',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'locationId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'locations',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'reservations',
                      'status',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['pending','confirmed','cancelled','completed'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pitches',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pitches',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pitches',
                      'pitch_type',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['event','collaboration','sponsorship','other'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pitches',
                      'message',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pitches',
                      'submitted_at',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pitches',
                      'notified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'address',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'latitude',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'longitude',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'hours',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'phone',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'city',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['Lucena','Lucban','Sariaya'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'locations',
                      'is_open',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'reference',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'customerId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'total',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'status',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['pending','paid','preparing','ready','completed','cancelled'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'pickup_time',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'paid',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'orders',
                      'stripe_charge',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'media',
                      'alt_text',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'media',
                      'caption',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pages',
                      'slug',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pages',
                      'title',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pages',
                      'content',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
            
            
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            
                
                    await queryInterface.removeColumn(
                        'pages',
                        'content',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pages',
                        'title',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pages',
                        'slug',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'media',
                        'caption',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'media',
                        'alt_text',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'stripe_charge',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'paid',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'pickup_time',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'status',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'total',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'customerId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'orders',
                        'reference',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'is_open',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'city',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'phone',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'hours',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'longitude',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'latitude',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'address',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'locations',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pitches',
                        'notified',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pitches',
                        'submitted_at',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pitches',
                        'message',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pitches',
                        'pitch_type',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pitches',
                        'email',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pitches',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'status',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'locationId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'party_size',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'reservation_end',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'reservation_start',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'message',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'phone',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'email',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'reservations',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'promotions',
                        'discount',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'promotions',
                        'active',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'promotions',
                        'end',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'promotions',
                        'start',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'promotions',
                        'description',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'promotions',
                        'title',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'categories',
                        'description',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'categories',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'is_available',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'is_featured',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'ingredients',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'item_type',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'categoryId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'price',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'description',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'menu_items',
                        'title',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'permissions',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'roles',
                        'role_customization',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'roles',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'app_roleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'provider',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetTokenExpiresAt',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetToken',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationTokenExpiresAt',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationToken',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerified',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'password',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'disabled',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'email',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'phoneNumber',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'lastName',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'firstName',
                        { transaction }
                    );
                
            
                
                    await queryInterface.dropTable('pages', { transaction });
                
            
                
                    await queryInterface.dropTable('media', { transaction });
                
            
                
                    await queryInterface.dropTable('orders', { transaction });
                
            
                
                    await queryInterface.dropTable('locations', { transaction });
                
            
                
                    await queryInterface.dropTable('pitches', { transaction });
                
            
                
                    await queryInterface.dropTable('reservations', { transaction });
                
            
                
                    await queryInterface.dropTable('promotions', { transaction });
                
            
                
                    await queryInterface.dropTable('categories', { transaction });
                
            
                
                    await queryInterface.dropTable('menu_items', { transaction });
                
            
                
                    await queryInterface.dropTable('permissions', { transaction });
                
            
                
                    await queryInterface.dropTable('roles', { transaction });
                
            
                
                    await queryInterface.dropTable('users', { transaction });
                
            
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
