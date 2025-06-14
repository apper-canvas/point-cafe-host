import React from 'react';

const Text = ({ 
  children, 
  variant = 'body', 
  size = 'md', 
  color = 'default',
  className = '',
  as: Component = 'p',
  ...rest 
}) => {
  const variants = {
    display: "font-heading font-bold",
    heading: "font-heading font-semibold",
    subheading: "font-heading font-medium",
    body: "font-sans",
    caption: "font-sans text-sm"
  };
  
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    '2xl': "text-2xl",
    '3xl': "text-3xl",
    '4xl': "text-4xl"
  };
  
  const colors = {
    default: "text-gray-900",
    muted: "text-gray-600",
    light: "text-gray-500",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    white: "text-white"
  };
  
  const textClasses = `${variants[variant]} ${sizes[size]} ${colors[color]} ${className}`;
  
  return (
    <Component className={textClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Text;