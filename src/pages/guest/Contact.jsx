import React from 'react';

const Contact = () => {
    return (
        <div className="custom-padding">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <div className="flex space-x-4">
                <img
                    src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720360352/files/social-media-5187243_1280_gshto6.png"  // Đường dẫn đến hình ảnh minh họa
                    alt="Contact us"
                    className="w-1/2 rounded-lg shadow-md"
                />
                <div className="flex-1">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email address"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Your phone number"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Your message"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            ></textarea>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
