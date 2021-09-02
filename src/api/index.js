/***
 * 请求的方法
 */
import base from './config'
import axios,{get,post} from '../utils/request'


const api ={
    /**
     * 登录请求 username password
     */
    getLogin(params){
        // return axios.post(base.login,params)
        return post(base.login,params)
    },
     /**
     * 注册接口
     */

     /**
      * 商品列表接口 projectList {page:1}
      * //{page:xx}
      */
    getProductList(params){//{page:xx}
        return  get(base.projectList,params)
    },
     /**
     * 搜索接口 {search:xx}
     */
      getSearch(params){
        return axios.get(base.search,{
            params
        })
    },
      /**
     * 选择类目  id
     */
    selectCategory(params){
        return get(base.selectCategory,params)
    },
    /**
     * 增加商品列表数据
      * 参数： title cid  category sellPoint price num desc paramsInfo image 
     */
    getAddProduct(params){
      return get(base.addProduct,params)
    },
    /**
      * 删除商品 {id:''}
    */
    deleteProduct(params){
      return get(base.deleteProduct,params)
    },
    /**
     * 编辑商品
     */
    updateProduct(params){
      return get(base.updateProduct,params)
    },
    /**
      * 规格参数列表
    */
    getParams(params){
      return get(base.getParams,params)
    },

}


export default api 
