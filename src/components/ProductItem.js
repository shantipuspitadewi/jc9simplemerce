import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })
    }
    
    
    addChartClick = (item) => {
        const quantity = parseInt(this.quantity.value)
        this.props.function(item, quantity)
        swal({
            icon: "success",
            title: "Daftar Belanjaan Telah Ditambahkan"
          });
    }
    
    render () {
        const {item} = this.props
        return (
            <div className="card border-dark col-3 m-3 text-center" style={{ width: "18rem" }} key={item.id}>
                <h3 className="card-title-top border-bottom">{item.name}</h3>
                <div className="card-body">
                    <img src={item.src} className="card-img" alt={item.name} />
                    <p className="card-text">{item.desc}</p>
                    <p className="card-text">{this.formatterIDR.format(item.price)}</p>
                    <input ref={input => this.quantity = input} className="form-control border-danger" type="number" defaultValue={1} />
                    <Link to={"/detailproduct/" + item.id}><button className="btn btn-secondary btn-block btn-sm my-2">Detail</button></Link>
                    <button onClick={() => {this.addChartClick(item)}}  className="btn btn-primary btn-block btn-sm my-2">Add to Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItem