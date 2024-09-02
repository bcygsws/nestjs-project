import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent, UpdateEvent,
} from 'typeorm';
import {Main} from './entities/main.entity';

@EventSubscriber()
export class MainSubscriber implements EntitySubscriberInterface<Main> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        console.log(`LISTENING TO: `, Main);
        return Main;
    }

    // beforeInsert(event: InsertEvent<Main>) {
    //     console.log(`BEFORE USER INSERTED: `, event.entity);
    // }

    // afterUpdate(event: UpdateEvent<Main>) {
    //     console.log(`AFTER USER UPDATED: `, event.entity);
    // }
}
