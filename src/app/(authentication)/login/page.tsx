import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import LoginForm from '@/app/(authentication)/login/login';
import { SearchParams } from '@/types/next';
import { getDictionary } from '@/locales/dictionary';
import Image from 'next/image';
import LoginPng from '/public/Kisana_New02.png'

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { callbackUrl } = searchParams;
  const dict = await getDictionary();

  const getCallbackUrl = () => {
    return callbackUrl ? callbackUrl.toString() : '/'; // Default redirect to home page
  };

  return (
    <Row className="min-vh-100 d-flex justify-content-center align-items-center px-3 rounded-1">
      <Col lg={7}>
        <Row className="justify-content-center">
          <Col
            md={7}
            className="position-relative bg-white dark:bg-dark border p-5"
            style={{ minHeight: '500px' }} // Adjust this value as needed
          >
            {/* Background Image */}
            {/* <Image
              fill
              className="bg-image" // Use this class for positioning
              src="/kisna_logo_new.jpg" // Path to your background image
              alt="Kisna Logo" // Proper alt text
              style={{ zIndex: -1, objectFit: 'cover' }} // Ensures the image covers the entire area
            /> */}

            <div className="position-relative z-index-1 text-center"> {/* Centering the logo */}
              {/* Logo as Title */}
              <Image
                src={LoginPng} // Path to your logo
                alt="Kisna Logo" // Proper alt text
                width={350} // Adjust width as needed
                height={90} // Adjust height as needed
                className="mb-3 rounded" // Add margin-bottom for spacing
                unoptimized
              />
              {/* Description */}
              <p className="text-black-50 dark:text-gray-500">{dict.login.description}</p>
              {/* Login Form */}
              <LoginForm callbackUrl={getCallbackUrl()} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
