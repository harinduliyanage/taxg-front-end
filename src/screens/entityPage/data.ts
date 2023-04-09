export interface CategoryOption {
    readonly value: string;
    readonly label: string;
}

export const CategoryOptions: readonly CategoryOption[] = [
    { value: '', label: 'Select'},
    { value: 'category1', label: 'Category 1'},
    { value: 'category2', label: 'Category 2'},
    { value: 'category3', label: 'Category 3'},
    { value: 'category4', label: 'Category 4'},
];

export interface industriesOption {
    readonly value: string;
    readonly label: string;
}

export const industriesOptions: readonly industriesOption[] = [
    { value: '', label: 'Select'},
    { value: 'manufacturing', label: 'Manufacturing'},
    { value: 'industry', label: 'Industry'},
    { value: 'production', label: 'Production'},
    { value: 'technology', label: 'Technology'},
    { value: 'trade', label: 'Trade'},
    { value: 'finance', label: 'Finance'},
    { value: 'marketing', label: 'Marketing'},
    { value: 'agriculture', label: 'Agriculture'},
    { value: 'construction', label: 'Construction'},
    { value: 'smallbusiness', label: 'Small business'},
    { value: 'retail', label: 'Retail'},
    { value: 'transport', label: 'Transport'},
    { value: 'telecommunications', label: 'Telecommunications'},
    { value: 'realestate', label: 'Real estate'},
    { value: 'healthcare', label: 'Health care'},
];

export interface UserOption {
    readonly value: string;
    readonly label: string;
}

export const UserOptions: readonly UserOption[] = [
    { value: '', label: 'Search by name or email'},
    { value: 'category1', label: 'Albert Fox'},
    { value: 'category2', label: 'Albert Rhinehart'},
    { value: 'category3', label: 'Albert Frappier'},
    { value: 'category4', label: 'Albert Simmmons'},
    { value: 'category5', label: 'Albert Brink'},
    { value: 'category6', label: 'Albert Halbert'},
];

export interface ServicesOption {
    readonly id: number;
    readonly title: string;
    readonly details: string;
}

export const ServicesOptions: readonly ServicesOption[] = [
    { id: 0, title: 'Search by name or email', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    { id: 1, title: 'Albert Fox', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    { id: 2, title: 'Albert Rhinehart', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    { id: 3, title: 'Albert Frappier', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    { id: 4, title: 'Albert Simmmons', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    { id: 5, title: 'Albert Brink', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    { id: 6, title: 'Albert Halbert', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
];