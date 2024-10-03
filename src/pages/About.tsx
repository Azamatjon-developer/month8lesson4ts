import axios from 'axios'
import { Component } from 'react'

interface Product {
  id: number
  title: string
  price: number
  images: string[]
  category: string
  rating: number
  description: string
}

interface HeaderState {
  data: Product[]
}

export class About extends Component<{}, HeaderState> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: [] as Product[],
    }
  }

  componentDidMount() {
    axios.get('https://dummyjson.com/products').then((res) => {
      this.setState({ data: res.data.products })
    })
  }

  render() {
    const productID = JSON.parse(
      window.localStorage.getItem('productID') as string,
    ) as number
    const product = this.state.data.find((item) => item.id === productID)

    return (
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-green-600 text-center mb-12">
            Product Overview
          </h2>
          {product ? (
            <div className="md:flex md:items-center md:space-x-12">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />

              <div className="md:w-1/2 space-y-8">
                <p className="text-xl">
                  <span className="font-semibold text-gray-800">Title:</span>{' '}
                  <span className="font-bold text-gray-900">
                    {product.title}
                  </span>
                </p>
                <p className="text-xl text-green-600">
                  <span className="font-semibold text-gray-800">Price:</span>{' '}
                  <span className="text-3xl">${product.price}</span>
                </p>
                <p className="text-xl">
                  <span className="font-semibold text-gray-800">
                    Description:
                  </span>{' '}
                  <span className="text-lg text-gray-700">
                    {product.description}
                  </span>
                </p>
                <p className="text-xl">
                  <span className="font-semibold text-gray-800">Rating:</span>{' '}
                  <span className="text-xl font-medium text-yellow-500">
                    {product.rating} ★
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl text-red-500 text-center">
              Product not found
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default About
