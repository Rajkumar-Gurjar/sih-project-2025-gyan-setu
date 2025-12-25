import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from './LanguageSwitcher';
import { describe, it, expect, beforeEach } from 'vitest';
import i18n from '../../../i18n/config';

describe('LanguageSwitcher', () => {
    beforeEach(async () => {
        await i18n.changeLanguage('en');
    });

    it('renders the current language', () => {
        render(<LanguageSwitcher />);
        // It renders "English" in the trigger and in the menu item
        expect(screen.getAllByText('English').length).toBeGreaterThan(0);
    });

    it('shows language options in dropdown', async () => {
        const user = userEvent.setup();
        render(<LanguageSwitcher />);
        
        const trigger = screen.getByLabelText('Select Language');
        await user.click(trigger);

        expect(screen.getByText('हिन्दी')).toBeInTheDocument();
        expect(screen.getByText('ਪੰਜਾਬੀ')).toBeInTheDocument();
    });

    it('changes language when an option is clicked', async () => {
        const user = userEvent.setup();
        render(<LanguageSwitcher />);
        
        const trigger = screen.getByLabelText('Select Language');
        await user.click(trigger);

        // Click the button that contains "हिन्दी" (specifically the one in the list)
        const hindiButtons = screen.getAllByText('हिन्दी');
        await user.click(hindiButtons[0]);

        expect(i18n.language).toContain('hi');
        await waitFor(() => {
            expect(screen.getAllByText('हिन्दी').length).toBeGreaterThan(0);
        });
    });
});
