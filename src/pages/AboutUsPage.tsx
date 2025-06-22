import { useForm } from 'react-hook-form';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import MapComponent from '../components/common/MapComponent';

const AboutUsPage = () => {
    const { register, handleSubmit } = useForm();

    const onContactSubmit = (data: any) => {
        console.log("Contact form data:", data);
        alert("Thank you for your message!");
    };

    return (
        <div className="bg-white">
            <div className="w-full h-[60vh] md:h-96 lg:h-[60vh]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7364.455249166487!2d100.59782272059395!3d13.704693693859168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d660ee13b4143%3A0xce95a7dabc2936a9!2sMETRO%20CAT!5e0!3m2!1sth!2sth!4v1750454587150!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="container px-4 py-20 mx-auto">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-dark">Contact Us</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <FiMapPin className="mt-1 text-primary" size={24} />
                                <div>
                                    <h4 className="text-lg font-semibold">Address</h4>
                                    <p className="text-gray-600">101 Sukhumvit Road, Bang Chak, Phra Khanong, Bangkok 10260</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiPhone className="mt-1 text-primary" size={24} />
                                <div>
                                    <h4 className="text-lg font-semibold">Phone</h4>
                                    <p className="text-gray-600">(+66) 81-234-5678</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiMail className="mt-1 text-primary" size={24} />
                                <div>
                                    <h4 className="text-lg font-semibold">Email</h4>
                                    <p className="text-gray-600">contact@mystore.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-dark">Get In Touch</h2>
                        <form onSubmit={handleSubmit(onContactSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <input
                                {...register("subject")}
                                type="text"
                                placeholder="Subject"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <textarea
                                {...register("message")}
                                placeholder="Message"
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>
                            <button type="submit" className="px-8 py-3 font-bold text-white rounded-md bg-primary hover:opacity-90">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;