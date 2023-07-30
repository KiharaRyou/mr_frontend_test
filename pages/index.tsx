import { useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';

interface SizeOptionType {
  id: number,
  label: string
}

interface ProductDetailType {
  id: number,
  title: string,
  description: string,
  price: number,
  imageURL: string,
  sizeOptions: SizeOptionType[]
}

const colProps = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 8 },
}

export default function Home() {

  const [loading, setLoading] = useState<boolean>(true);
  const [productDetail, setProductDetail] = useState<ProductDetailType>({
    id: 0,
    title: 'No item',
    description: 'No description',
    price: 0,
    imageURL: '',
    sizeOptions: []
  });

  const getData = async () => {
    setLoading(true);
    
    await fetch(`https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`)
      .then((res) => res.json())
      .then((data: ProductDetailType) => {
        setProductDetail(data);
      })
      .catch(error => {
        console.log(error);
      })

    setLoading(false); 
    
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <Skeleton loading={loading}>
      <Row>
        <Col {...colProps}>{productDetail.imageURL}</Col>
        <Col {...colProps}>
          <h2>{productDetail.title}</h2>
          <div><strong>$ {productDetail.price.toFixed(2)}</strong></div>
          <p>{productDetail.description}</p>
        </Col>
      </Row>
    </Skeleton>
  )
}
