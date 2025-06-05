import { ApiProperty } from '@nestjs/swagger';
import { PageResponse } from './page-response.utils';

export class PageRequest {
  @ApiProperty({ description: 'The page number to retrieve', example: 1, required: false })
  pageNumber?: number = 1;

  @ApiProperty({ description: 'The number of items per page', example: 200, required: false })
  pageSize?: number = 200;

  @ApiProperty({
    description: 'Sorting criteria in the format { field: "asc" | "desc" }',
    example: { id: 'desc' },
    required: false,
  })
  sortBy?: Record<string, 'desc' | 'asc'> = { id: 'desc' };

  @ApiProperty({ description: 'Search query string', example: '', required: false })
  search?: string = "";

  get skip(): number {
    return this.pageNumber * this.pageSize - this.pageSize;
  }

  toPageResponse<T>(content: T[], count: number): PageResponse<T> {
    return new PageResponse<T>(this, content, count);
  }

  getFilter() {
    return {
      skip: this.skip,
      take: this.pageSize,
      orderBy: this.sortBy,
    };
  }
}