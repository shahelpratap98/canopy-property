import { Phone } from 'lucide-react';
import Fab from './Fab';
import { SITE, primaryContact } from '../siteConfig';

const NOT_SET_HINT = 'No phone number set — add one to SITE.contacts in src/siteConfig.ts';
const DEV_PREVIEW = import.meta.env.DEV;

/**
 * Floating "Call now" button. Takes the lower slot because a phone call is the
 * highest-intent action for a trades business.
 *
 * Uses the first configured contact. Both numbers are listed on the Contact page
 * and in the footer, where there is room to name who is who.
 */
export default function CallButton() {
  const contact = primaryContact();

  return (
    <Fab
      href={contact ? contact.phoneHref : null}
      ariaLabel={
        contact
          ? `Call ${SITE.name}${contact.name ? ` — ${contact.name}` : ''} on ${contact.phone}`
          : NOT_SET_HINT
      }
      label={contact ? 'Call now' : 'Call (no number)'}
      icon={<Phone size={22} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />}
      slot="lower"
      unconfiguredHint={NOT_SET_HINT}
      devPreview={DEV_PREVIEW}
    />
  );
}
