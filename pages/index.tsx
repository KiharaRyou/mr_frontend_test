import { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Image, Space, Button } from 'antd';
import styles from './index.module.scss';

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
  const [currentSize, setCurrentSize] = useState<SizeOptionType | null>(null);

  const onSizeClick = (size_id: number) => {
    const size_index = productDetail.sizeOptions.findIndex(size => size.id === size_id);
    if(size_index !== -1) {
      setCurrentSize(productDetail.sizeOptions[size_index])
    }
  };

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
      <Row gutter={16} style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Col {...colProps} style={{textAlign:'center'}}>
          <Image src={productDetail.imageURL} style={{width: '100%'}} />
        </Col>
        <Col {...colProps}>
          <h2 className={styles.title}>{productDetail.title}</h2>
          <div className={styles.price}><strong>$ {productDetail.price.toFixed(2)}</strong></div>
          <p className={styles.description}>{productDetail.description}</p>
          <div className={styles.size}>
            <strong>SIZE</strong>
            <span className={styles.star}>*</span>
            {currentSize !== null && <strong className={styles.currentSize}>{currentSize.label}</strong>}
          </div>
          <div>
            <Space direction="vertical">
              <Space wrap>
                {productDetail.sizeOptions.map((size: SizeOptionType, index) => 
                  <Button 
                    className={currentSize?.id === size.id ? styles.currentSizeBtn : undefined}
                    key={index} 
                    onClick={() => {
                      onSizeClick(size.id);
                    }}
                  >
                    {size.label}
                  </Button>
                )}
              </Space>
            </Space>
          </div>  
        </Col>
      </Row>
    </Skeleton>
  )
}
