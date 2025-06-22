// src/components/common/SupportArea.tsx

import { FiTruck, FiHeadphones, FiDollarSign, FiGift } from 'react-icons/fi';
import React from 'react';
import { useTranslation } from 'react-i18next'; 

// สร้าง Interface สำหรับข้อมูลแต่ละรายการ
interface SupportItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const SupportItem = ({ icon, title, description }: SupportItemProps) => {
    return (
        <div className="flex items-center gap-4 p-4 ml-5 lg:ml-0">
            <div className="text-primary">
                {icon}
            </div>
            <div>
                <h5 className="text-lg font-bold text-dark">{title}</h5>
                <p className="text-gray-500">{description}</p>
            </div>
        </div>
    );
};


const SupportArea = () => {
    const { t } = useTranslation();

    const supportData = [
        {
            icon: <FiTruck size={36} />,
            titleKey: "support_area.free_shipping_title",
            descriptionKey: "support_area.free_shipping_desc"
        },
        {
            icon: <FiHeadphones size={36} />,
            titleKey: "support_area.support_title",
            descriptionKey: "support_area.support_desc"
        },
        {
            icon: <FiDollarSign size={36} />,
            titleKey: "support_area.money_return_title",
            descriptionKey: "support_area.money_return_desc"
        },
        {
            icon: <FiGift size={36} />,
            titleKey: "support_area.order_discount_title",
            descriptionKey: "support_area.order_discount_desc"
        }
    ];

    return (
        <div className="w-full py-16 bg-white px-15 ml-11">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 divide-x-0 divide-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
                    {supportData.map((item, index) => (
                        <SupportItem 
                            key={index}
                            icon={item.icon}
                            title={t(item.titleKey)}
                            description={t(item.descriptionKey)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupportArea;