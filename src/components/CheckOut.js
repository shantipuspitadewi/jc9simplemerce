import React, { Component } from 'react';

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })
          
    }

    total = () => {
        if (this.props.list !== 0) {
            let total = 0
            for (let elt of this.props.list) {
                let t = elt.quantity * elt.item.price
                total += t
            }
            return total
        }else {
            return 0
        }
    }
    
    renderList = () => {
        return this.props.list.map(it => {
            return (
                <tr key={it.id}>
                    <td>{it.item.id}</td>
                    <td>{it.item.name}</td>
                    <td>{it.item.desc}</td>
                    <td>{this.formatterIDR.format(it.item.price)}</td>
                    <td>{it.quantity}</td>
                    <td>{this.formatterIDR.format(it.item.price * it.quantity)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 className="display-4 text-center">Total Belanjaan Anda</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>Total yang harus dibayar :</strong></td>
                        <td>{this.formatterIDR.format(this.total())}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CheckOut;