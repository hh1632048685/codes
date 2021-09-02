/**
 * 基础的接口地址
 */
const base={
    baseUrl:"http://localhost:8888",//基础地址
    login:"/api/login",//登录接口
    projectList:"/api/projectList",//商品列表接口
    search:'/api/search',//搜索接口
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    uploadUrl:'/upload',//上图图片
    addProduct:"/api/backend/item/insertTbItem",//增加商品接口
    deleteProduct:"/api/backend/item/deleteItemById",//删除商品列表
    updateProduct:"/api/backend/item/updateTbItem",//修改商品
    getParams:"/api/backend/itemParam/selectItemParamAll",//规格参数列表
}

export default base