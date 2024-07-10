import React from 'react'

const SubSection = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col justify-center items-center p-8">
  <div className="text-center max-w-4xl">
    <h1 className="text-4xl mt-10 font-extrabold text-custom-purple underline">
      What We Offer
    </h1>
    <p className="text-xl text-black mt-10">
      Quickly and easily create interactive online quizzes for free! With Quizizz, you can create a quiz that boosts engagement and participation with just a few clicks. Whether you’re looking to create a <span className="text-purple-600 underline">homework assignment</span> for Math class, or an <span className="text-purple-600 underline">ice breaker</span> to welcome new faces, there’s something here for everyone.
    </p>
    <div className="mt-12 flex flex-col md:flex-row items-center md:items-start">
      <div className="md:w-1/2 p-4 mt-10">
        <h2 className="text-3xl font-extrabold text-custom-purple underline">Quizizz for Schools</h2>
        <p className="mt-4 text-black text-xl">
          Craft questions that enable students to identify multiple relevant areas, challenging them to think deeply about the image’s elements and their relationships.
        </p>
      </div>
      <div className="md:w-1/2 p-4 flex justify-center md:justify-end">
      <img
        className="rounded-full   transition-transform duration-300 hover:scale-125"
        src="https://www.continentalpress.com/wp-content/uploads/2017/07/support-ells-in-classroom-blog-image.jpg"
        alt="Quizizz for Schools"
      />
    </div>
    </div>
    <div className="mt-12 flex flex-col md:flex-row items-center md:items-start">
      <div className="md:w-1/2 p-4 mt-3">
        <h2 className="text-3xl font-extrabold text-custom-purple underline">Quizizz for Work</h2>
        <p className="mt-4 text-black text-xl">
          Make employee training and education fun with Quizizz for Work. Our online quiz maker enables you to facilitate live engagement through presentations, quizzes, and polls. Use Quizizz at work for employee onboarding, e-learning, community engagement, and more!
        </p>
      </div>
      <div className="md:w-1/2 p-4 flex justify-center md:justify-end">
        <img className='rounded-full transition-transform duration-300 hover:scale-125' src="https://imageio.forbes.com/specials-images/dam/imageserve/1128880583/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="Quizizz for Work"/>
      </div>
    </div>
  </div>
</div>
  )
}

export default SubSection