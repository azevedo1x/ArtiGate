import { Article, ArticleAuthor } from '@prisma/client';
import { CreateArticleDTO } from '../../application/dtos/article/createArticle.dto';
import { ArticleRepository } from './article.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';

@Injectable()
export class ArticleRepositoryImplementation implements ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateArticleDTO): Promise<Article> {
    const article = {
      summary: data.summary,
    };

    const articleRecord = await this.prisma.article.create({ data: article });

    for (const userId of data.authorIds) {
      await this.prisma.articleAuthor.create({
        data: { articleId: articleRecord.id, userId },
      });
    }

    return articleRecord;
  }

  async findById(id: string): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async findAllAuthors(): Promise<ArticleAuthor[]> {
    return this.prisma.articleAuthor.findMany();
  }

  async findAuthorsByArticleId(articleId: string): Promise<ArticleAuthor[]> {
    return this.prisma.articleAuthor.findMany({ where: { articleId } });
  }
}
