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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {this.state.data.map((item) => (
            <a href='/about' onClick={() => window.localStorage.setItem("productID", JSON.stringify(item.id))} key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
              <img src={item.images[0]} alt={item.title} className="w-[500px] h-[450px] rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold text-green-600">${item.price}</span>
                  <button className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
