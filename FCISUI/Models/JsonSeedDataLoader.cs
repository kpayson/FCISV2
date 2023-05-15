using System.Text.Json;
using System.Text.Json.Nodes;

namespace FCISUI.Models
{
    public class JsonSeedDataLoader {
        private string _seedDataFolder;

        private IEnumerable<T> getEntities<T>(string seedFile)
        {
            var jsonPath = Path.Combine(_seedDataFolder, seedFile);
            var json = File.ReadAllText(jsonPath);
            var data = JsonSerializer.Deserialize<T[]>(json)!;
            return data;
        }

        public JsonSeedDataLoader(string seedDataFolder){
            this._seedDataFolder = seedDataFolder;
        }

        public List<Facility> GetFacilities() {
            var facilities = getEntities<Facility>("facility.json").ToList();
            return facilities;
        }

        public List<Room> GetRooms() {
            var rooms = getEntities<Room>("room.json").ToList();
            return rooms;
        }

        public List<RoomParameter> GetRoomParameters() {
            var roomParameters = getEntities<RoomParameter>("room_parameter.json").ToList();
            return roomParameters;
        }

        public List<Gsfgrowth> GetGsfGrowth() {
            var growthRecords = getEntities<Gsfgrowth>("gsfgrowth.json").ToList();
            return growthRecords;
        }

        public List<SvgMap> GetSvgMap() {
            var svgMaps = getEntities<SvgMap>("svgMap.json").ToList();
            return svgMaps;
        }

        public List<SvgMapPin> GetSvgMapPins() {
            var svgMapPins = getEntities<SvgMapPin>("svgMapPin.json").ToList();
            return svgMapPins;
        }

        public List<SvgMapArrow> GetSvgMapArrows() {
            var svgMapArrows = getEntities<SvgMapArrow>("svgMapArrow.json").ToList();
            return svgMapArrows;
        }

        public List<AttachmentType> GetAttachmentTypes() {
            var attachmentTypes = getEntities<AttachmentType>("attachmentType.json").ToList();
            return attachmentTypes;
        }

        public List<Attachment> GetAttachments() {
            var attachments = getEntities<Attachment>("attachment.json").ToList();
            return attachments;
        }
    }
}
