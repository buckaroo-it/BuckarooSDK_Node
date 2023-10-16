import { Article } from '../../../Models/Interfaces/IArticle';

export class In3OldArticle extends Article {
    set identifier(identifier: string) {
        this.set('code', identifier);
    }

    set description(description: string) {
        this.set('name', description);
    }
}
