import React from 'react';
import { ChevronRight } from 'lucide-react';

const MenuItem = ({ icon, title, subtitle, badge, hasBorder = true, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex items-center px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${hasBorder ? 'border-b border-gray-100' : ''}`}
    >
        <div className="w-6 flex justify-center">
            {icon}
        </div>
        <div className="ml-4 flex-1">
            <div className="flex items-center">
                <span className="font-bold text-gray-800">{title}</span>
                {badge && (
                    <span className="ml-3 text-[10px] font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {badge}
                    </span>
                )}
            </div>
            {subtitle && <div className="text-sm text-gray-500 mt-0.5">{subtitle}</div>}
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
);

const DashboardMenu = ({ navigate }) => {
    return (
        <div className="flex-1 flex flex-col">
            <MenuItem 
                icon={<Bell className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Notifications" 
                onClick={() => {}}
            />
            
            <MenuItem 
                icon={<ShoppingBag className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Your Bookings" 
                subtitle="View all your upcoming & past appointments" 
                onClick={() => navigate('/my-bookings')}
            />
            
            <MenuItem 
                icon={<Youtube className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Saved Styles" 
                subtitle="Haircuts & looks you've bookmarked" 
                onClick={() => {}}
            />
            
            <MenuItem 
                icon={<CreditCard className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Salon Wallet" 
                subtitle="View your balance, cards and offers" 
                onClick={() => {}}
            />
            
            <MenuItem 
                icon={<HelpCircle className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Help & Support" 
                subtitle="View commonly asked queries and Chat" 
                onClick={() => {}}
            />
            
            <MenuItem 
                icon={<Settings className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Accounts & Settings" 
                subtitle="Location, Payments, Permissions & More" 
                onClick={() => navigate('/profile')}
            />
            
            <MenuItem 
                icon={<Gift className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Rewards" 
                subtitle="View your rewards & unlock new ones"
                badge="2 Unopened"
                onClick={() => {}}
            />
            
            <MenuItem 
                icon={<Share2 className="w-5 h-5 text-gray-600 stroke-[1.5]" />} 
                title="Refer a Friend" 
                hasBorder={false}
                onClick={() => {}}
            />
        </div>
    );
};

// Re-importing lucide-react components for the sub-component
import { Bell, ShoppingBag, Youtube, CreditCard, HelpCircle, Settings, Gift, Share2 } from 'lucide-react';

export default DashboardMenu;
