import sanitizeHtml from 'sanitize-html';

interface SanitizeHtmlProps {
  allowedAttributes?: Record<string, string[]>;
  allowedTags?: string[];
  as?: React.ElementType;
  className?: string;
  text: string;
}

export const SanitizeHtml: React.FC<SanitizeHtmlProps> = ({
  allowedAttributes,
  allowedTags,
  as: Component = 'div',
  text,
  ...rest
}) => (
  <Component
    dangerouslySetInnerHTML={{
      __html: sanitizeHtml(text, {
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          ...(allowedAttributes || {}),
        },
        allowedTags: [
          ...sanitizeHtml.defaults.allowedTags,
          ...(allowedTags || []),
        ],
      }),
    }}
    {...rest}
  />
);
