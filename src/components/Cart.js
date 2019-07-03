import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom'


import CheckOut from './CheckOut'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state= {
            datacart: [],
            flag: false
        }
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })
    }


    checkout = () => {
        if (this.state.flag){
            return <CheckOut list={this.state.datacart}/> 
        } else {
           return (<div className="d-flex justify-content-center">
                        <button onClick={this.clickCheckOutBtn} className="btn btn-outline-primary">Check Out</button>
                    </div>) 
        }

    }

    clickCheckOutBtn = () => {
        this.setState({flag: true})
    }

    renderList = () => {
        return this.state.datacart.map (data => {
            return (
                <tr key={data.id}>
                    <td>{data.item.id}</td>
                    <td>{data.item.name}</td>
                    <td>{data.item.desc}</td>
                    <td>{this.formatterIDR.format(data.item.price)}</td>
                    <td>{data.quantity}</td>
                    <td><img className="list" src={data.item.src} alt={data.item.desc}></img></td>
                    <td>
                        {/* <button className="btn btn-primary mr-2">Edit</button> */}
                        <button onClick={() => {this.deleteCart(data.id)}} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    getCart = () => {
        axios.get('http://localhost:2019/carts?username='+ this.props.username)
        .then(res => {
            this.setState({datacart: res.data})
        })
    }

    deleteCart = (id) => {
        axios.delete('http://localhost:2019/carts/' + id)
            .then(res => {
                this.getCart()
            })
    }

    componentDidMount () {
        this.getCart()
    }

    render() {
        if(this.state.datacart.length !== 0) {
            return (
                <div>
                    <h1 className="display-4 text-center">Cart List</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
    
                            {this.renderList()}
                        </tbody>
                    </table>
                    {this.checkout()}
                </div>
            )
        }else {
            return (
                <div className="container mt-5">
                    <div className=" row d-flex justify-content-center">
                        <h1 className="display-4 text-center">ANDA BELUM MEMILIH PRODUK SAMA SEKALI SILAHKAN BERANJAK KE HALAMAN <Link to='/'><strong>PRODUK KAMI</strong></Link> UNTUK BERBELANJA </h1>
                    </div>
                </div>
            )
        }
            
    
    }
}

const mapStateToPorps = (state) => {
    return ({username: state.auth.username})
}
export default connect (mapStateToPorps)(Cart);