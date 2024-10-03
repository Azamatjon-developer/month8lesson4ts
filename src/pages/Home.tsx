import axios from 'axios';
import { Component } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

interface HeaderState {
  counter: number;
  text: string;
  data: Product[];
}

export default class Home extends Component<{}, HeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
      text: 'Hello',
      data: [] as Product[],
    };
  }

  componentDidMount(): void {
    axios
      .get('https://dummyjson.com/products')
      .then((res) => this.setState({ data: res.data.products }));
  }

  render() {
    return (
      <div className="flex flex-col items-center p-8">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-500 drop-shadow-lg">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {this.state.data.map((item) => (
            <a
              href="/about"
              onClick={() => window.localStorage.setItem("productID", JSON.stringify(item.id))}
              key={item.id}
              className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 overflow-hidden hover:shadow-xl"
            >
              <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300">{item.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-2xl font-bold text-green-600">${item.price}</span>
                  <span className="text-sm text-gray-500">Category: {item.category}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
