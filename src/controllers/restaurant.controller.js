export async function get(req, res){
    var loGenericResponseModel;
    Menu.hasMany(Restaurant, { as: "restaurant", foreignKey: "menu_id" });
    Restaurant.belongsTo(Menu, { as: "menu", foreignKey: "menu_id" });
  
    const a = await Restaurant.findAll({
      include: [{ model: Menu, as: "menu" }],
    });
  
    res.json({
      data: a,
    });
  }