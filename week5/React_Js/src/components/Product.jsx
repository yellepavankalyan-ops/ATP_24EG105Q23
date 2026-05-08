function Product(props){
    const { productObj }= props;
    //state
    //return 
    return(
        <div className="shadow-2xl p-5">
        <h2 className="text-2xl font-bold text-blue-800">{productObj.title}</h2>
        <p className="font-bold">{productObj.price}</p>
        <p className="font-mono">{productObj.description}</p>
        </div>
    )
}

export default Product;