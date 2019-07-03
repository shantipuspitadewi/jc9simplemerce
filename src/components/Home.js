import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import ProductItem from './ProductItem';

class Home extends Component {
    state = {
        products: [],
        productsSearch: [],
    }

    componentDidMount () {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
                this.setState({products: res.data, productsSearch: res.data})
            })
    }
    
    renderList = () => {
       return this.state.productsSearch.map(iteem => {
            return (
                <ProductItem item={iteem} function={this.addChart} key={iteem.id}/>
            )
        })
    }

    addChart = (item, quant) => {
        // console.log(item)
        const qnt = quant || 1;
        axios.get('http://localhost:2019/carts?username='+ this.props.username, {
            params: {
                productId: item.id
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.length !== 0) {
                // console.log('if')
                const qntb = qnt + res.data[0].quantity;
                axios.put('http://localhost:2019/carts/' + res.data[0].id, {
                    username: this.props.username,
                    quantity: qntb,
                    productId: item.id,
                    item,
                })
            }else {
                // console.log('else')
                axios.post('http://localhost:2019/carts', {
                    username: this.props.username,
                    quantity: qnt,
                    productId: item.id,
                    item,
                })
            } 
        })    
    }

    onBtnSearch = () => {
        const name = this.name.value
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)
        
        var arrSearch = this.state.products.filter(item => {
            if (isNaN(max) && isNaN(min)) {
                return item.name.toLowerCase().includes(name.toLowerCase())
            }else if(isNaN(min)){
                return item.name.toLowerCase().includes(name.toLowerCase()) && item.price <= max
            }else if (isNaN(max)){
                return item.name.toLowerCase().includes(name.toLowerCase()) && item.price >= min
            }else {
                return item.name.toLowerCase().includes(name.toLowerCase()) && item.price >= min && item.price <= max
            }
            
        })

        this.setState({productsSearch: arrSearch})

    }

    render() {
        return (
            <div className="row">
                <div className="col-2">
                <div className="mt-3 ml-2 row">
                        <div className="mx-auto card text-white bg-dark">
                            <div className="card-body">
                                <div className="border-bottom border-danger card-title">
                                    <h1>Filter</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input onChange={event => this.setState({name:event.target.value})} ref={input => this.name = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input onChange={event => this.setState({min:event.target.value})} placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input onChange={event => this.setState({max:event.target.value})} placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-danger text-white btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({username: state.auth.username})
}
export default connect (mapStateToProps)(Home)