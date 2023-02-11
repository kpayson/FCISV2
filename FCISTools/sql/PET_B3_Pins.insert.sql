Declare @SvgMapId int;
Set @SvgMapId = 10;

INSERT INTO [dbo].[SvgMapPin]
           ([SvgMapId],
           [LocationId]
           ,[Title]
           ,[Cx]
           ,[Cy]
           ,[R]
           )
Select @SvgMapId, '5640', '5640', 429.78, 500.92, 9.93 union
Select @SvgMapId, '5642', '5642', 523.21, 500.92, 9.93 union
Select @SvgMapId, '6624', '6624', 357.99, 177.64, 9.93 union
Select @SvgMapId, '1C166A5A', '1C166A5A', 216.17, 128.1, 19.45