import { serverRequests } from '../axios-server';

export const Contact = {
    create: contact => serverRequests.post("/contact", (contact)),
}