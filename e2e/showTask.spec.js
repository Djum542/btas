/**
* @description User check your task (3 test step)
*   step 1: LINE 28 - User want to see list task
*   step 2: LINE 31 - User check description task 
*   step 3: LINE 42 - User want to change task
*                   - CASE 1: Time is invalid
                    - CASE 2: Time is valid
*   step 4: LINE 55 - User want to disable task
* */
const {
    scrollTo,
    enterInput,
    tapId,
    tapText,
    swipe,
    expectIdToHaveText
} = require("./step-definition")

describe('View list task', () => {
    beforeEach(async () => {
        await device.launchApp();
    });

    it('Step 1: LINE 28 - User want to see list task', async () => {
        await enterInput('phoneNumber_input', '397411511')
        await enterInput('password_input', '19111998qq')
        await tapId('login_btn')
        await tapText('Công việc')
        await expectIdToHaveText('status', 'WAITING')
        await expectIdToHaveText('staff', 'Đang chờ người nhận công việc...')
        await tapText('Chi tiết')
    })

    it('Step 2: LINE 31 - User check description task', async () => {
        await expectIdToHaveText('header', 'Vị trí làm việc')
        await expectIdToHaveText('home_number', '21 Than Thai')
        await expectIdToHaveText('address', '21 Than Thai, Hai Chau, Da Nang')
        await expectIdToHaveText('date', '05/09/2021 - 11:07')
        await expectIdToHaveText('time', '5 giờ')
        await expectIdToHaveText('duration', '85m2 / 3 phòng')
        await expectIdToHaveText('note', 'Khong')
        await expectIdToHaveText('price', '400000 VND')
    })

    it('Step 3: LINE 42 - User want to change task', async () => {
        await tapId('change_address')
        await enterInput('input_address', 'K12/12 Trường Sơn, Hoà Thọ Tây, Cẩm Lệ, Đà Nẵng')
        await tapId('save_address')
        await tapId('change_note')
        await enterInput('input_note', 'Don tủ bát đĩa phòng bếp')
        await tapId('save_note')
        await tapId('change_duration')
        await tapId('duration_2')
        await tapId('date')
        // CASE 1: Time is invalid


        // CASE 2: Time is valid


        await tapText('Lưu')
        await tapText('OK')
    })

    it('LINE 55 - User want to disable task', async () => {
        await tapText('Huỷ việc')
        await tapText('OK')
    })
})
