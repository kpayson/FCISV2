export interface Attachment
{
    storedFileName:string,
    docTitle:string,
    description:string,
    url:string
}
export interface AttachmentGroup
{
    description:string;
    attachments: Attachment[];
}
