import { LoggerService } from '@@core/@core-services/logger/logger.service';
import { ApiKeyAuthGuard } from '@@core/auth/guards/api-key.guard';
import { ConnectionUtils } from '@@core/connections/@utils';
import { FetchObjectsQueryDto } from '@@core/utils/dtos/fetch-objects-query.dto';
import { ApiCustomResponse } from '@@core/utils/types';
import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FulfillmentOrdersService } from './services/fulfillmentorders.service';
import { UnifiedFulfillmentOrdersOutput } from './types/model.unified';

@ApiTags('ats/fulfillmentorders')
@Controller('ats/fulfillmentorders')
export class FulfillmentOrdersController {
  constructor(
    private readonly fulfillmentordersService: FulfillmentOrdersService,
    private logger: LoggerService,
    private connectionUtils: ConnectionUtils,
  ) {
    this.logger.setContext(FulfillmentOrdersController.name);
  }

  @ApiOperation({
    operationId: 'getFulfillmentOrderss',
    summary: 'List a batch of FulfillmentOrderss',
  })
  @ApiHeader({
    name: 'x-connection-token',
    required: true,
    description: 'The connection token',
    example: 'b008e199-eda9-4629-bd41-a01b6195864a',
  })
  @ApiCustomResponse(UnifiedFulfillmentOrdersOutput)
  @UseGuards(ApiKeyAuthGuard)
  @Get()
  async getFulfillmentOrderss(
    @Headers('x-connection-token') connection_token: string,
    @Query() query: FetchObjectsQueryDto,
  ) {
    try {
      const { linkedUserId, remoteSource, connectionId } =
        await this.connectionUtils.getConnectionMetadataFromConnectionToken(
          connection_token,
        );
      const { remote_data, limit, cursor } = query;
      return this.fulfillmentordersService.getFulfillmentOrderss(
        connectionId,
        remoteSource,
        linkedUserId,
        limit,
        remote_data,
        cursor,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({
    operationId: 'getFulfillmentOrders',
    summary: 'Retrieve a FulfillmentOrders',
    description:
      'Retrieve a fulfillmentorders from any connected Ecommerce software',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'id of the fulfillmentorders you want to retrieve.',
  })
  @ApiQuery({
    name: 'remote_data',
    required: false,
    type: Boolean,
    description:
      'Set to true to include data from the original Ecommerce software.',
  })
  @ApiHeader({
    name: 'x-connection-token',
    required: true,
    description: 'The connection token',
    example: 'b008e199-eda9-4629-bd41-a01b6195864a',
  })
  @ApiCustomResponse(UnifiedFulfillmentOrdersOutput)
  @UseGuards(ApiKeyAuthGuard)
  @Get(':id')
  async retrieve(
    @Headers('x-connection-token') connection_token: string,
    @Param('id') id: string,
    @Query('remote_data') remote_data?: boolean,
  ) {
    const { linkedUserId, remoteSource } =
      await this.connectionUtils.getConnectionMetadataFromConnectionToken(
        connection_token,
      );
    return this.fulfillmentordersService.getFulfillmentOrders(
      id,
      linkedUserId,
      remoteSource,
      remote_data,
    );
  }
}
