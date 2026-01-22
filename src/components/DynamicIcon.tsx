import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
    name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
    const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;

    if (!IconComponent) {
        // Fallback to a default icon if the name isn't found
        return <LucideIcons.Circle {...props} />;
    }

    return <IconComponent {...props} />;
};

export default DynamicIcon;
