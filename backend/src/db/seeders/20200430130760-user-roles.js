
const { v4: uuid } = require("uuid");

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert("roles", [
      
      
      { id: getId("Administrator"), name: "Administrator", createdAt, updatedAt },
      
      
        
          { id: getId("owner"), name: "owner", createdAt, updatedAt },
        
          { id: getId("manager"), name: "manager", createdAt, updatedAt },
        
          { id: getId("content_manager"), name: "content_manager", createdAt, updatedAt },
        
          { id: getId("barista"), name: "barista", createdAt, updatedAt },
        
          { id: getId("guest"), name: "guest", createdAt, updatedAt },
        
      
      
      { id: getId("Public"), name: "Public", createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        { id: getId(`CREATE_${name.toUpperCase()}`), createdAt, updatedAt, name: `CREATE_${name.toUpperCase()}` },
        { id: getId(`READ_${name.toUpperCase()}`), createdAt, updatedAt, name: `READ_${name.toUpperCase()}` },
        { id: getId(`UPDATE_${name.toUpperCase()}`), createdAt, updatedAt, name: `UPDATE_${name.toUpperCase()}` },
        { id: getId(`DELETE_${name.toUpperCase()}`), createdAt, updatedAt, name: `DELETE_${name.toUpperCase()}` }
      ];
    }

    const entities = [
      "users","roles","permissions","menu_items","categories","promotions","reservations","pitches","locations","orders","media","pages",,
    ];
await queryInterface.bulkInsert("permissions", entities.flatMap(createPermissions));
await queryInterface.bulkInsert("permissions", [{ id: getId(`READ_API_DOCS`), createdAt, updatedAt, name: `READ_API_DOCS` }]);
await queryInterface.bulkInsert("permissions", [{ id: getId(`CREATE_SEARCH`), createdAt, updatedAt, name: `CREATE_SEARCH`}]);


await queryInterface.sequelize.query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);


await queryInterface.bulkInsert("rolesPermissionsPermissions", [
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_USERS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_USERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_USERS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_USERS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_USERS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_MENU_ITEMS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_MENU_ITEMS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('CREATE_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('UPDATE_MENU_ITEMS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('DELETE_MENU_ITEMS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_MENU_ITEMS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('READ_MENU_ITEMS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_CATEGORIES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_CATEGORIES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('CREATE_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('UPDATE_CATEGORIES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('DELETE_CATEGORIES') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_CATEGORIES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('READ_CATEGORIES') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_PROMOTIONS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_PROMOTIONS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('CREATE_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('UPDATE_PROMOTIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('DELETE_PROMOTIONS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_PROMOTIONS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('READ_PROMOTIONS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_RESERVATIONS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_RESERVATIONS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_RESERVATIONS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_RESERVATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('UPDATE_RESERVATIONS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('CREATE_RESERVATIONS') },
                    
                  
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_PITCHES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_PITCHES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_PITCHES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_PITCHES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_PITCHES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_PITCHES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_PITCHES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_PITCHES') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_PITCHES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_PITCHES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('CREATE_PITCHES') },
                    
                  
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_LOCATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_LOCATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_LOCATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_LOCATIONS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_LOCATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_LOCATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_LOCATIONS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_LOCATIONS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_LOCATIONS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_LOCATIONS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('READ_LOCATIONS') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_ORDERS') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_ORDERS') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_ORDERS') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('CREATE_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_ORDERS') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('UPDATE_ORDERS') },
                    
                  
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('CREATE_ORDERS') },
                    
                  
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_MEDIA') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_MEDIA') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('CREATE_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('UPDATE_MEDIA') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('DELETE_MEDIA') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_MEDIA') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
    
      
      
          
                
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('READ_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('UPDATE_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('DELETE_PAGES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('READ_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('UPDATE_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('DELETE_PAGES') },
                    
                  
                  
                
               
                
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('CREATE_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('READ_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('UPDATE_PAGES') },
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('DELETE_PAGES') },
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('READ_PAGES') },
                    
                  
                    
                  
                    
                  
                  
                
               
                
                  
                    
                  
                    
                      { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('READ_PAGES') },
                    
                  
                    
                  
                    
                  
                  
             
          
    
  
    
     
  
      
      
        
            { createdAt, updatedAt, roles_permissionsId: getId("owner"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("manager"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("content_manager"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("barista"), permissionId: getId('CREATE_SEARCH') },
        
            { createdAt, updatedAt, roles_permissionsId: getId("guest"), permissionId: getId('CREATE_SEARCH') },
        
      
      
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_USERS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_ROLES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PERMISSIONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_MENU_ITEMS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_MENU_ITEMS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_MENU_ITEMS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_MENU_ITEMS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_CATEGORIES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_CATEGORIES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_CATEGORIES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_CATEGORIES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PROMOTIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PROMOTIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PROMOTIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PROMOTIONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_RESERVATIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_RESERVATIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_RESERVATIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_RESERVATIONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PITCHES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PITCHES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PITCHES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PITCHES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_LOCATIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_LOCATIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_LOCATIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_LOCATIONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_ORDERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_ORDERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_ORDERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_ORDERS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_MEDIA') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_MEDIA') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_MEDIA') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_MEDIA') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PAGES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PAGES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PAGES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PAGES') },
    
    
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_API_DOCS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_SEARCH') },
    ]);


  await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("SuperAdmin")}' WHERE "email"='super_admin@flatlogic.com'`);
  await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("Administrator")}' WHERE "email"='admin@flatlogic.com'`);
  
   
      
      
        
        
           await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("owner")}' WHERE "email"='client@hello.com'`);
        await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("manager")}' WHERE "email"='john@doe.com'`);
       
      
      

}
};

