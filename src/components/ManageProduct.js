import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class ManageProduct extends Component {

    state = {
        products: [],
        selectedId: 0
    }
 
    // ini jalan sekali setelah proses rendering pertama kali
    componentDidMount() {
        this.getProduct()
    }
    getProduct = () => {
        axios.get('http://localhost:1997/products')
            .then(res => {
                this.setState({products: res.data, selectedId: 0})
            })
    }

    renderList = () => {
        return this.state.products.map(item => { // {id, name, desc, price, src}
            if(item.id !== this.state.selectedId){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td><img className="list" src={item.src} alt={item.desc}></img></td>
                        <td>
                            <button onClick={() => {this.editProduct(item.id)}} className="btn btn-primary mr-2">Edit</button>
                            <button onClick={() => {this.deleteProduct(item.id)}} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editImg = input}} type="text" defaultValue={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.onSaveItem(item.id)}} className="btn btn-primary mb-2">Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    addProduct = () => {
        const nama = this.name.value
        const desk = this.desc.value
        const harga = this.price.value
        const sumber = this.pict.value
        
        axios.post('http://localhost:2019/products',{
            name: nama,
            desc: desk,
            price: harga,
            src:sumber
        }).then(res => {
            this.getProduct()
        })
    }

    deleteProduct = (id) => {
        axios.delete('http://localhost:2019/products/' + id)
        .then(res => {
            this.getProduct()
        })
    }

    editProduct = id => {
        this.setState({selectedId: id})
    }

    onSaveItem = (id) => {
        const nama = this.editName.value
        const desk = this.editDesc.value
        const harga = parseInt(this.editPrice.value)
        const sumber = this.editImg.value
        axios.put('http://localhost:2019/products/' + id, {
            name: nama,
            desc: desk,
            price: harga,
            src:sumber
        }).then(() => {
            this.getProduct()
        })
    }

    render() {
        if(this.props.username !==""){
        return (
            <div className="container">
               
                <h1 className="display-4 text-center">Manage Product</h1>
                <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                <th scope="col"><button onClick={this.addProduct} className="btn btn-outline-warning" >Add</button></th>
                            </tr>
                        </tbody>
                    </table>
            </div>
        )}else {
            return <Redirect to="/" />
        }
    }
}
const mstp = state => {
    return {username:state.auth.username}
}
export default connect(mstp)(ManageProduct)