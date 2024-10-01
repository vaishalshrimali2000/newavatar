'use client'

import {
  Alert, Button, Col, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useDictionary from '@/locales/dictionary-hook'
import Image from 'next/image';

export default function Login({ callbackUrl }: { callbackUrl: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const dict = useDictionary()

  const login = async (formData: FormData) => {
    setSubmitting(true)

    try {
      const res = await signIn('credentials', {
        username: formData.get('username'),
        password: formData.get('password'),
        redirect: false,
        callbackUrl,
      })

      if (!res) {
        setError('Login failed')
        return
      }

      const { ok, url, error: err } = res

      if (!ok) {
        if (err) {
          setError(err)
          return
        }

        setError('Login failed')
        return
      }

      if (url) {
        router.push(url)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Alert
        variant="danger"
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>
      <Form action={login} style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px' }}>
        
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faUser}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder={dict.login.form.username}
            aria-label="Username"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faLock}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder={dict.login.form.password}
            aria-label="Password"
          />
        </InputGroup>

        <Row className="align-items-center justify-content-center"> {/* Add justify-content-center to center the button */}
        <Col xs={12} className="text-center">
  <Button
    className="px-12 mt-4"
    style={{ backgroundColor: '#040430', borderColor: '#040430',width:"18rem" }} // Apply your custom color
    type="submit"
    disabled={submitting}
  >
    {dict.login.form.submit}
  </Button>
</Col>

          {/* Uncomment this section if you want to keep the forgot password link
          <Col xs={6} className="text-end">
            <Link className="px-0" href="#">
              {dict.login.forgot_password}
            </Link>
          </Col> */}
        </Row>
      </Form>
    </div>
  )
}




// 'use client';

// import React from "react";

// export default function Login() {
//   return (
//     <>
//       <div
//         className="relative flex items-center justify-center h-screen bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/assets/image/CoupleBand4_old2.png')", // Replace with your background image path
//         }}
//       >
//         <div className="container mx-auto px-4 flex justify-center items-center">
//           <div className="w-full lg:w-4/12 px-4">
//             <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-white border-3">
//               <div className="rounded-t mb-0 px-6 py-6 flex justify-center items-center">
//                 <div className="btn-wrapper text-center">
//                   <img
//                     alt="KISNA LOGO"
//                     width={320}
//                     height={80}
//                     className="rounded-lg"
//                     src="/assets/img/kisna_logo_new.jpg"
//                   />
//                 </div>
//               </div>
//               <hr />
//               <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//                 <div className="text-blueGray-600 text-center mb-3 font-bold">
//                   <small>LOGIN</small>
//                 </div>
//                 <form>
//                   <div className="flex flex-col mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="username"
//                     >
//                       Username
//                     </label>
//                     <input
//                       type="email"
//                       className="border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
//                       placeholder="Email"
//                       id="username"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="password"
//                     >
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       className="border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
//                       placeholder="Password"
//                       id="password"
//                       required
//                     />
//                   </div>
                  
//                   <div className="flex items-center mb-6">
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         id="customCheckLogin"
//                         type="checkbox"
//                         className="form-checkbox border-2 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
//                       />
//                       <span className="ml-2 text-sm font-semibold text-blueGray-600">
//                         Remember me
//                       </span>
//                     </label>
//                   </div>

//                   <div className="text-center mt-6">
//                     <button
//                       className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                       type="submit"
//                     >
//                       Sign In
//                     </button>
//                   </div>

//                   <div className="flex flex-wrap mt-6 relative">
//                     <div className="w-1/2">
//                       <a href="#pablo" className="text-black-200">
//                         <small className="font-bold">Forgot password?</small>
//                       </a>
//                     </div>
//                     <div className="w-1/2 text-right">
//                       {/* Uncomment if you want to add a link for account creation */}
//                       {/* <Link href="/auth/register" className="text-black-200">
//                         <small>Create new account</small>
//                       </Link> */}
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
