
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const [publicRole] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'Public' LIMIT 1;`
    );

    if (!publicRole || !publicRole[0]) {
      console.error("Public role not found");
      return;
    }

    const publicRoleId = publicRole[0].id;

    const permissionsToGrant = [
      'READ_MENU_ITEMS',
      'CREATE_RESERVATIONS',
      'READ_LOCATIONS',
      'READ_CATEGORIES',
      'CREATE_PITCHES',
      'READ_MEDIA'
    ];

    const [permissions] = await queryInterface.sequelize.query(
      `SELECT id, name FROM permissions WHERE name IN (${permissionsToGrant.map(p => `'${p}'`).join(',')});`
    );

    const rolePermissions = permissions.map(permission => ({
      createdAt,
      updatedAt,
      roles_permissionsId: publicRoleId,
      permissionId: permission.id
    }));

    return queryInterface.bulkInsert('rolesPermissionsPermissions', rolePermissions, {
      ignoreDuplicates: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Usually we don't want to remove these in down as it might break things,
    // but for completeness:
    const [publicRole] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'Public' LIMIT 1;`
    );
    if (publicRole && publicRole[0]) {
       return queryInterface.bulkDelete('rolesPermissionsPermissions', {
         roles_permissionsId: publicRole[0].id
       });
    }
  }
};
