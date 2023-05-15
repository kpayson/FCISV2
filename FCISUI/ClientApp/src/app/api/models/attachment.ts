export interface Attachment
{
    storedFileName:string,
    docTitle:string,
    url:string
}
export interface AttachmentGroup
{
    description:string;
    attachments: Attachment[];
}
