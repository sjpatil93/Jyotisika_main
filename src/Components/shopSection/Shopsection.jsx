import React from 'react'

const Shopsection = () => {
    return (
        <div style={{backgroundColor:"#fefaea"}}>
            <h1 className="highlight text-center pt-5 ">Top Shopseller</h1>

            <p className='fw-light text-center'>Divine essentials crafted for your journey.</p>

            <div className='p-5 text-center' style={{}}>
              <a href="https://jyotisikamall.netlify.app/">  <button className='btn text-white' style={{ background: "linear-gradient(to right, rgba(254,191,49,1), rgba(238,128,0,1))",height:"37px",width:"134px" }}>View all</button></a>
            </div>
        </div>
    )
}

export default Shopsection