module.exports = function(app) {
  let lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'CustomUser'];
  let ds = app.dataSources.postgres;
  ds.autoupdate(lbTables, function(err) {
    if (err) {
      throw err;
    }
    console.log(`Loopback tables [${lbTables}] created in `, ds.adapter.name);
  });
};
