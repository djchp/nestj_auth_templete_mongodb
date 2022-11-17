import { Module } from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose'
import { NoteSchema } from './note.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Note', schema: NoteSchema}])]
})
export class NoteModule {}
