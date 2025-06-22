import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    const { t } = useTranslation(); 

    return (
        <footer className="pt-24 pb-16 text-gray-600 bg-gray-100">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-4 text-3xl font-bold text-dark">MyStore</Link>
                        <p className="text-sm">© 2025 MyStore.<br />All Rights Reserved</p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-dark">{t('footer.about_us')}</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-primary">{t('navbar.about_us')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('footer.store_location')}</a></li>
                            <li><a href="/about" className="hover:text-primary">{t('footer.contact')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('footer.orders_tracking')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-dark">{t('footer.useful_links')}</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-primary">{t('footer.returns')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('footer.support_policy')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('footer.size_guide')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('footer.faqs')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-dark">{t('footer.follow_us')}</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary"><FiFacebook /> {t('footer.facebook')}</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary"><FiTwitter /> {t('footer.twitter')}</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary"><FiInstagram /> {t('footer.instagram')}</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary"><FiYoutube /> {t('footer.youtube')}</a></li>
                        </ul>
                    </div>
                    
                    <div className="lg:col-span-1">
                         <h3 className="mb-4 text-lg font-semibold text-dark">{t('footer.subscribe')}</h3>
                         <p className="mb-4 text-sm">{t('footer.subscribe_desc')}</p>
                         <form>
                            <input type="email" placeholder={t('footer.subscribe_placeholder') || ''} className="w-full p-2 mb-2 border rounded-md"/>
                            <button type="submit" className="w-full py-2 font-semibold text-white rounded-md bg-primary hover:opacity-90">
                                {t('footer.subscribe_button')}
                            </button>
                         </form>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;