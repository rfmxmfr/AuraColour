import React from 'react';
import sanitizeHtml from 'sanitize-html';

// Default sanitization options
const DEFAULT_OPTIONS = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src', 'alt', 'height', 'width'],
    '*': ['class', 'id']
  },
  allowedSchemes: ['http', 'https', 'mailto'],
};

/**
 * Hook to safely render HTML content
 * @param html Raw HTML content
 * @param options Sanitization options
 * @returns Safe HTML object for dangerouslySetInnerHTML
 */
export function useSafeHtml(html: string, options = DEFAULT_OPTIONS) {
  const sanitizedHtml = React.useMemo(() => {
    return { __html: sanitizeHtml(html, options) };
  }, [html, options]);
  
  return sanitizedHtml;
}

/**
 * Safe HTML component
 * @param props Component props
 * @returns React component that safely renders HTML
 */
export function SafeHtml({ 
  html, 
  options = DEFAULT_OPTIONS,
  className = '',
  tag = 'div'
}: {
  html: string;
  options?: sanitizeHtml.IOptions;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}) {
  const safeHtml = useSafeHtml(html, options);
  const Tag = tag as any;
  
  return <Tag className={className} dangerouslySetInnerHTML={safeHtml} />;
}

/**
 * Example usage:
 * 
 * // Using the hook
 * const htmlContent = "<p>User content with <strong>formatting</strong></p>";
 * const safeHtml = useSafeHtml(htmlContent);
 * return <div dangerouslySetInnerHTML={safeHtml} />;
 * 
 * // Using the component
 * return <SafeHtml html={htmlContent} />;
 */